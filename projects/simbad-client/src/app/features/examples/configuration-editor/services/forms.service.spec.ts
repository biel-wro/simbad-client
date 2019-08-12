import { TestBed } from '@angular/core/testing';

import { FormsService } from './forms.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ObjectsDefinitionsService } from '../../../../core/core.module';
import { provideMockStore } from '@ngrx/store/testing';
import {
    configurationFileInitialConfigurationMock,
    configurationFileModelMock,
    formValueInitialConfigurationMock,
    formValueModelMock,
    treeFormValueModelMock
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

    describe('deepAssign', () => {
        it('should correctly assign surface level property', () => {
            // given
            const obj = {};
            const property = 'surface';
            const value = 'test';

            // when
            service.deepAssign(obj, property, value);

            // then
            expect(obj[property]).toBeDefined();
        });

        it('should correctly assign deep level property', () => {
            // given
            const obj = {};
            const property = 'deep/under/surface';
            const value = 'test';

            // when
            service.deepAssign(obj, property, value);

            // then
            expect(obj['deep']['under']['surface']).toBeDefined();
        });
    });

    describe('treeToFormPatch', () => {
        it('should return all absolute paths and their properties in object', () => {
            // given
            const tree = {
                complexParam1: {
                    paramVal: 1
                },
                paramVal2: 2
            };

            const expectedResult = {
                'complexParam1/paramVal': 1,
                paramVal2: 2
            };

            // when
            const result = service.treeToFormPatch(tree);

            // then
            expect(result).toEqual(expectedResult);
        });
    });

    describe('configurationObjectToTreeValue', () => {
        it('should convert object to its tree$ value', () => {
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
                stream: {
                    final_estimator: {
                        class: 'population_size',
                        population_size: {
                            start_size: 100000
                        }
                    }
                }
            };

            // when
            const result = service.configurationObjectToTreeValue(obj);
            expect(result).toEqual(expected);
        });
    });

    describe('treeFormValueToConfiguration', () => {
        it('should convert tree value to conf object', () => {
            // given
            const tree = treeFormValueModelMock;
            const expected = configurationFileModelMock;

            // when
            const result = service.treeFormValueToConfiguration(tree);

            // then
            expect(result).toEqual(expected);
        });
    });

    describe('formValueToConfiguration', () => {
        it('should convert form value to configuration', () => {
            // given
            const formValue = formValueModelMock;
            const expected = configurationFileModelMock;

            // when
            const result = service.formValueToConfigurationObject(formValue);

            // then
            expect(result).toEqual(expected);
        });

        it('should convert form value to configuration when form value has initial_configuration object', () => {
            // given
            const formValue = formValueInitialConfigurationMock;
            const expected = configurationFileInitialConfigurationMock;

            // when
            const result = service.formValueToConfigurationObject(formValue);

            // then
            expect(result).toEqual(expected);
        });
    });

    describe('buildFormForNode', () => {
        it('should build configuration-editor that returns valid value for root object', () => {
            // given
            const className = 'model';
            const object = ods.getByClassName(className);
            const node = ods.toParameterTreeNode(object, '');
            let form = new FormGroup({});

            // when
            form = service.buildFormForNode(form, node);

            // then
        });
    });

    describe('configurationObjectToTreePatch', () => {
        it('should convert object to its configuration-editor patch', () => {
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
            const result = service.configurationObjectToFormPatch(obj);

            // then
            expect(result).toEqual(expected);
        });

        // it('should convert object with multiple nested complex parameters to its configuration-editor patch', () => {
        //     // given
        //     const obj = {
        //         model: {
        //             class: 'parameter_evolution_3d',
        //             parameters: {
        //                 space: {
        //                     tile_size: null
        //                 },
        //                 birth: {
        //                     dispersion: {
        //                         sigma: null
        //                     },
        //                     saturation: {
        //                         class: 'generalized_exponential',
        //                         generalized_exponential: {
        //                             sigma: null,
        //                             gamma: null,
        //                             tolerance: null
        //                         }
        //                     },
        //                     mutator: {
        //                         efficiency: {
        //                             class: 'uniform_step',
        //                             uniform_step: {
        //                                 increase_length: null,
        //                                 decrease_length: null
        //                             }
        //                         },
        //                         resistance: {
        //                             class: 'uniform_step',
        //                             uniform_step: {
        //                                 increase_length: null,
        //                                 decrease_length: null
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     };
        //
        //     const expected = {
        //         'model/class': 'parameter_evolution_3d',
        //         'model/parameter_evolution_3d/space/tile_size': null,
        //         'model/parameter_evolution_3d/birth/dispersion/sigma': null,
        //         'model/parameter_evolution_3d/birth/saturation/sigma': null,
        //         'model/parameter_evolution_3d/birth/saturation/class': 'generalized_exponential',
        //         'model/parameter_evolution_3d/birth/saturation/generalized_exponential/sigma': null,
        //         'model/parameter_evolution_3d/birth/saturation/generalized_exponential/gamma': null,
        //         'model/parameter_evolution_3d/birth/saturation/generalized_exponential/tolerance': null,
        //         'model/parameter_evolution_3d/birth/mutator/efficiency/class': 'uniform_step',
        //         'model/parameter_evolution_3d/birth/mutator/efficiency/uniform_step/increase_length': null,
        //         'model/parameter_evolution_3d/birth/mutator/efficiency/uniform_step/decrease_length': null,
        //         'model/parameter_evolution_3d/birth/mutator/resistance/class': 'uniform_step',
        //         'model/parameter_evolution_3d/birth/mutator/resistance/uniform_step/increase_length': null,
        //         'model/parameter_evolution_3d/birth/mutator/resistance/uniform_step/decrease_length': null
        //     };
        //
        //     // when
        //     const result = service.configurationObjectToFormPatch(obj);
        //
        //     // then
        //     console.log(Object.keys(result));
        //     console.log(Object.keys(expected));
        //     expect(result).toEqual(expected);
        // });
    });
});
