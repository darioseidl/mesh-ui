import { browser, ElementFinder, WebElement } from 'protractor';
import * as uuid from 'uuid-random';

import { MeshNode } from '../src/app/common/models/node.model';
import { Project } from '../src/app/common/models/project.model';

import { createFolder, deleteNode, getProject } from './api';

/**
 * Creates a temporary folder in the root node of the project.
 * The folder and all its contents are deleted after the body has been executed.
 *
 * @param language The language of the created folder
 * @param body A function that is executed
 */
export async function temporaryFolderWithLanguage(
    description: string,
    language: string,
    body: (context: { folder: MeshNode }) => void
) {
    describe(description, () => {
        let project: Project;
        const context: { folder: MeshNode } = {} as any;
        let folder: MeshNode;

        beforeAll(async () => {
            project = await getProject();
            folder = await createFolder(project.rootNode, 'tmpFolder' + uuid(), language);
            context.folder = folder;
        });

        afterAll(async () => {
            await deleteNode(folder);
        });

        body(context);
    });
}

/**
 * Creates a temporary folder in the root node of the project.
 * The folder and all its contents are deleted after the body has been executed.
 *
 * @param body A function that is executed
 */
export async function temporaryFolder(description: string, body: (context: { folder: MeshNode }) => void) {
    return temporaryFolderWithLanguage(description, 'en', body);
}

/**
 * Maps an Element from Protractor to its text. Useful for .map
 */
export function toText(element: ElementFinder | undefined) {
    return element!.getText();
}

/**
 * Retrieves the text of the first text node inside an element.
 * There is no other way in protractor to retrieve the text.
 * See https://stackoverflow.com/questions/32479422/how-do-i-get-the-text-of-a-nested-element-in-html-for-automation-using-selenium
 */
export function getTextNodeText(el: WebElement) {
    return browser.executeScript(function(elem: any) {
        const children = elem.childNodes;
        for (let i = 0; i < children.length; i++) {
            // 3 == TEXT_NODE
            if (children[i].nodeType === 3) {
                const trimmed = children[i].textContent.trim();
                if (trimmed.length > 0) {
                    return trimmed;
                }
            }
        }
    }, el);
}

export async function assertNoConsoleErrors() {
    const logs = await browser
        .manage()
        .logs()
        .get('browser');
    expect(logs.length).toEqual(0);
}
