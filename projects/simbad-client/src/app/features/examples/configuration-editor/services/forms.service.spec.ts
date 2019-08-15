import { TestBed } from '@angular/core/testing';

import { FormsService } from './forms.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ObjectsDefinitionsService } from '../../../../core/core.module';
import { provideMockStore } from '@ngrx/store/testing';
import {
    configurationFileInitialConfigurationMock,
    configurationFileModelMock,
    formPatchWithInitialConfigurationMock,
    formValueModelMock,
    formValueModelWithDefaultValuesMock
} from '@simbad-client/app/core/configuration-management/mocks';

describe('FormsService', () => {
    let service: FormsService;
    let ods: ObjectsDefinitionsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FormBuilder,
                ObjectsDefinitionsService,
                provideMockStore({
                    initialState: {}
                })
            ]
        });
        service = TestBed.get(FormsService);
        ods = TestBed.get(ObjectsDefinitionsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('configurationToFormValue', () => {
        it('should convert configuration to its form value', () => {
            // given
            const obj = {
                stream: {
                    final_estimator: {
                        class: 'population_size',
                        parameters: {
                            start_size: 100000
                        }
                    }
                }
            };

            const expected = {
                'stream/final_estimator/class': 'population_size',
                'stream/final_estimator/population_size/start_size': 100000
            };

            // when
            const result = service.configurationToFormValue(obj);

            // then
            expect(result).toEqual(expected);
        });

        it('should convert configuration with multiple complex objects objects to its form value', () => {
            // given
            const configuration = { ...configurationFileModelMock };
            const expected = { ...formValueModelMock };

            // when
            const patch = service.configurationToFormValue(configuration);

            // then
            expect(patch).toEqual(expected);
        });

        it('should convert configuration with default_attributes object to its form value', () => {
            // given
            const configuration = configurationFileInitialConfigurationMock;
            const expected = formPatchWithInitialConfigurationMock;

            // when
            const patch = service.configurationToFormValue(configuration);

            // then
            expect(patch).toEqual(expected);
        });
    });

    describe('formValueToConfiguration', () => {
        it('should convert form value to configuration', () => {
            // given
            const formValue = { ...formValueModelMock };
            const expected = { ...configurationFileModelMock };

            // when
            const result = service.formValueToConfiguration(formValue);

            // then
            expect(result).toEqual(expected);
        });

        it('should convert form value to configuration when form value has initial_configuration object', () => {
            // given
            const formValue = formPatchWithInitialConfigurationMock;
            const expected = configurationFileInitialConfigurationMock;

            // when
            const result = service.formValueToConfiguration(formValue);

            // then
            expect(result).toEqual(expected);
        });
    });

    describe('addNodeControlsToFormRecursive', () => {
        it('should build configuration-editor that returns valid value for root object', () => {
            // given
            const node = ods.buildNodeFromClassName('model');
            const expectedFormValue = formValueModelWithDefaultValuesMock;
            const form = new FormGroup({});

            // when
            service.addNodeControlsToFormRecursive(form, node);
            const result = form.getRawValue();

            // then
            expect(result).toEqual(expectedFormValue);
        });
    });

    describe('removeNodeControlsFromForm', () => {
        it('should remove all node controls from form', () => {
            // given
            const parentPath = 'model/parameter_evolution_3d';
            const firstNode = ods.buildNodeFromClassName('birth', parentPath);
            const secondNode = ods.buildNodeFromClassName('death', parentPath);
            const expectedFormValue = {
                'model/parameter_evolution_3d/death/saturation/class': 'generalized_exponential',
                'model/parameter_evolution_3d/death/saturation/generalized_exponential/sigma': 1,
                'model/parameter_evolution_3d/death/saturation/generalized_exponential/gamma': 2,
                'model/parameter_evolution_3d/death/saturation/generalized_exponential/scale': 10,
                'model/parameter_evolution_3d/death/mutator/efficiency/class': 'uniform_step',
                'model/parameter_evolution_3d/death/mutator/efficiency/uniform_step/increase_length': 0.1,
                'model/parameter_evolution_3d/death/mutator/efficiency/uniform_step/decrease_length': 1,
                'model/parameter_evolution_3d/death/mutator/resistance/class': 'uniform_step',
                'model/parameter_evolution_3d/death/mutator/resistance/uniform_step/increase_length': 0.1,
                'model/parameter_evolution_3d/death/mutator/resistance/uniform_step/decrease_length': 1
            };
            const form = new FormGroup({});

            // when
            service.addNodeControlsToFormRecursive(form, firstNode);
            service.addNodeControlsToFormRecursive(form, secondNode);
            service.removeNodeControlsFromForm(form, firstNode);
            const result = form.getRawValue();

            // then
            expect(result).toEqual(expectedFormValue);
        });
    });

});
