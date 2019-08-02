export const configurationFileMock = {
    stream: {
        final_estimator: {
            class: 'population_size',
            parameters: {
                start_size: '100000'
            }
        }
    },
    model: {
        class: 'parameter_evolution_3d',
        parameters: {
            space: {
                tile_size: '3'
            },
            seed: '13',
            mutation: {
                probability: '0.05'
            },
            interaction: {
                sigma: '1',
                gamma: '2',
                tolerance: '0.1'
            },
            birth: {
                dispersion: {
                    sigma: '1'
                },
                saturation: {
                    class: 'generalized_exponential',
                    parameters: {
                        sigma: '5',
                        gamma: '2',
                        scale: '10'
                    }
                },
                mutator: {
                    efficiency: {
                        class: 'uniform_step',
                        parameters: {
                            increase_length: '0.1',
                            decrease_length: '1.0'
                        }
                    },
                    resistance: {
                        class: 'uniform_step',
                        parameters: {
                            increase_length: '0.1',
                            decrease_length: '1.0'
                        }
                    }
                }
            }
        }
    }
};
