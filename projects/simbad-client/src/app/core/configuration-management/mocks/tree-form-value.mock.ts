export const treeFormValueModelMock = {
    model: {
        class: 'parameter_evolution_3d',
        parameter_evolution_3d: {
            space: {
                tile_size: 3
            },
            seed: 13,
            mutation: {
                probability: 0.05
            },
            interaction: {
                sigma: 1,
                gamma: 2,
                tolerance: 0.1
            },
            birth: {
                dispersion: {
                    sigma: 1
                },
                saturation: {
                    class: 'generalized_exponential',
                    generalized_exponential: {
                        sigma: 5,
                        gamma: 2,
                        scale: 10
                    }
                },
                mutator: {
                    efficiency: {
                        class: 'uniform_step',
                        uniform_step: {
                            increase_length: 0.1,
                            decrease_length: 1.0
                        }
                    },
                    resistance: {
                        class: 'uniform_step',
                        uniform_step: {
                            increase_length: 0.1,
                            decrease_length: 1.0
                        }
                    }
                }
            },
            death: {
                saturation: {
                    class: 'inverse_generalized_exponential',
                    inverse_generalized_exponential: {
                        sigma: 10,
                        gamma: 2,
                        scale: 1000
                    }
                },
                mutator: {
                    efficiency: {
                        class: 'uniform_step',
                        uniform_step: {
                            increase_length: 0.1,
                            decrease_length: 1.0
                        }
                    },
                    resistance: {
                        class: 'uniform_step',
                        uniform_step: {
                            increase_length: 0.1,
                            decrease_length: 1.0
                        }
                    }
                }
            },
            success: {
                saturation: {
                    class: 'generalized_exponential',
                    generalized_exponential: {
                        sigma: 5,
                        gamma: 2,
                        scale: 1
                    }
                },
                mutator: {
                    efficiency: {
                        class: 'uniform_step',
                        uniform_step: {
                            increase_length: 0.1,
                            decrease_length: 1
                        }
                    },
                    resistance: {
                        class: 'uniform_step',
                        uniform_step: {
                            increase_length: 0.1,
                            decrease_length: 1.0
                        }
                    }
                }
            }
        }
    }
};

export const treeFormValueInitialConfigurationMock = {

};
