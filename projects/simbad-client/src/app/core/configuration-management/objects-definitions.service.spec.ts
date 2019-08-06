import { TestBed } from '@angular/core/testing';

import { ObjectsDefinitionsService } from './objects-definitions.service';
import { ParameterDefinition } from './models';

describe('ObjectsDefinitionsService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ObjectsDefinitionsService = TestBed.get(ObjectsDefinitionsService);
        expect(service).toBeTruthy();
    });

    describe('getByClassName', () => {
        it('should return correct definition for root parameter', () => {
            // given
            const service: ObjectsDefinitionsService = TestBed.get(ObjectsDefinitionsService);
            const className = 'model';

            // when
            const parameter = service.getByClassName(className);

            // then
            expect(parameter).toBeTruthy();
            expect(parameter.possibleClasses).toContain('parameter_evolution_3d');
        });

        it('should return correct definition for enum parameter', () => {
            // given
            const service: ObjectsDefinitionsService = TestBed.get(ObjectsDefinitionsService);
            const className = 'final_estimator';

            // when
            const parameter = service.getByClassName(className);

            // then
            expect(parameter).toBeTruthy();
            expect(parameter.possibleClasses).toContain('population_size');
        });

        it('should return correct definition for complex parameter', () => {
            // given
            const service: ObjectsDefinitionsService = TestBed.get(ObjectsDefinitionsService);
            const className = 'population_size';

            // when
            const parameter = service.getByClassName(className);

            // then
            expect(parameter).toBeTruthy();
            expect(parameter.childClasses).toEqual(['start_size']);
        });

        it('should return correct definition for simple parameter', () => {
            // given
            const service: ObjectsDefinitionsService = TestBed.get(ObjectsDefinitionsService);
            const className = 'start_size';

            // when
            const parameter = service.getByClassName(className);

            // then
            expect(parameter).toBeTruthy();
            expect(parameter.valueType).toEqual('int');
            expect(parameter.minValue).toEqual(0);
        });

        it('should return undefined when parameter is not defined in schema', () => {
            // given
            const service: ObjectsDefinitionsService = TestBed.get(ObjectsDefinitionsService);
            const className = 'some_parameter';

            // when
            const parameter = service.getByClassName(className);

            // then
            expect(parameter).toBeFalsy();
        });
    });

    describe('getAllChildren', () => {
        it('should return all child parameter if parameter when parameter has any', () => {
            // given
            const service: ObjectsDefinitionsService = TestBed.get(ObjectsDefinitionsService);
            const className = 'population_size';
            const children: ParameterDefinition[] = [
                {
                    className: 'start_size',
                    description:
                        'Pellentesque dui ante, iaculis vel ligula et, cursus cursus eros. Cras eget metus vel' +
                        ' elit vulputate sollicitudin vel ac tellus. Duis cursus, enim eget interdum faucibus,' +
                        ' nisi purus pulvinar risus',
                    type: 'simple',
                    valueType: 'int',
                    minValue: 0,
                    maxValue: 9999999,
                    defaultValue: 100000,
                    isRoot: false
                }
            ];

            // when
            const objects = service.getAllChildren(className);

            // then
            expect(objects).toEqual(children);
        });
        it('should return empty array when parameter has no child objects', () => {
            // given
            const service: ObjectsDefinitionsService = TestBed.get(ObjectsDefinitionsService);
            const className = 'start_size';

            // when
            const objects = service.getAllChildren(className);

            // then
            expect(objects).toEqual([]);
        });
    });

    describe('isSchemaValid', () => {
        it('should return true when currentSchema is valid', () => {
            // given
            const service: ObjectsDefinitionsService = TestBed.get(ObjectsDefinitionsService);

            // when
            const result = service.isSchemaValid();

            // then
            expect(result).toBeTruthy();
        });
    });

    describe('toParameterTreeNode', () => {
        // it('should return valid parameter tree$ for root parameter', () => {
        //     // given
        //     const service: ObjectsDefinitionsService = TestBed.get(ObjectsDefinitionsService);
        //     const className = 'stream';
        //     const parameter = service.getByClassName(className);
        //
        //     // when
        //     const tree = service.toParameterTreeNode(parameter);
        //
        //     // then
        //     expect(tree.simpleChildren).toEqual([]);
        //     expect(tree.complexChildren.length).toEqual(1);
        //     expect(tree.complexChildren[0].definition.className).toEqual('final_estimator');
        // });

        it('should return parameter tree$ with objects with valid paths', () => {
            // given
            const service: ObjectsDefinitionsService = TestBed.get(ObjectsDefinitionsService);
            const className = 'stream';
            const parameter = service.getByClassName(className);

            // when
            const tree = service.toParameterTreeNode(parameter);

            // then
            expect(tree.path).toEqual('stream');
            expect(tree.complexChildren[0].path).toEqual('stream/final_estimator');
        });

        it('should return valid parameter tree$ for complex parameter', () => {
            // given
            const service: ObjectsDefinitionsService = TestBed.get(ObjectsDefinitionsService);
            const className = 'birth';
            const parameter = service.getByClassName(className);

            // when
            const tree = service.toParameterTreeNode(parameter);

            // then
            expect(tree.simpleChildren).toEqual([]);
            expect(tree.complexChildren[0].definition.className).toEqual('dispersion');
            expect(tree.complexChildren[1].definition.className).toEqual('saturation');
            expect(tree.complexChildren[2].definition.className).toEqual('mutator');
        });

        it('should return valid parameter tree$ for simple parameter', () => {
            // given
            const service: ObjectsDefinitionsService = TestBed.get(ObjectsDefinitionsService);
            const className = 'start_size';
            const parameter = service.getByClassName(className);

            // when
            const tree = service.toParameterTreeNode(parameter);

            // then
            expect(tree.simpleChildren).toEqual([]);
            expect(tree.complexChildren).toEqual([]);
        });
    });
});
