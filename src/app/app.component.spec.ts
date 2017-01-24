import {NO_ERRORS_SCHEMA} from '@angular/core';
import {async, TestBed, ComponentFixture} from '@angular/core/testing';

import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';

describe(`App`, () => {
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule],
            declarations: [AppComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp    = fixture.componentInstance;

        fixture.detectChanges();
    });

    it(`should be readly initialized`, () => {
        expect(fixture).toBeDefined();
        expect(comp).toBeDefined();
    });

});