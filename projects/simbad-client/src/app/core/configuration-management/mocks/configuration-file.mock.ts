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
    },
    initial_configuration: {
        class: 'cubic_crystal',
        default_attributes: {
            'birth': {
                'efficiency': 0.1,
                'resistance': 0.5
            },
            'death': {
                'efficiency': 0.1,
                'resistance': 0.5
            },
            'success': {
                'efficiency': 0.1,
                'resistance': 0.5
            },
            'mutation': {
                'id': 1
            }
        },
        parameters: {
            'dimension': 3,
            'radius': 2,
            'spacing': 1
        }
    }
};

export const configurationFileModelMock = {
    model: {
        class: 'parameter_evolution_3d',
        parameters: {
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
                    parameters: {
                        sigma: 5,
                        gamma: 2,
                        scale: 10
                    }
                },
                mutator: {
                    efficiency: {
                        class: 'uniform_step',
                        parameters: {
                            increase_length: 0.1,
                            decrease_length: 1.0
                        }
                    },
                    resistance: {
                        class: 'uniform_step',
                        parameters: {
                            increase_length: 0.1,
                            decrease_length: 1.0
                        }
                    }
                }
            },
            death: {
                saturation: {
                    class: 'inverse_generalized_exponential',
                    parameters: {
                        sigma: 10,
                        gamma: 2,
                        scale: 1000
                    }
                },
                mutator: {
                    efficiency: {
                        class: 'uniform_step',
                        parameters: {
                            increase_length: 0.1,
                            decrease_length: 1.0
                        }
                    },
                    resistance: {
                        class: 'uniform_step',
                        parameters: {
                            increase_length: 0.1,
                            decrease_length: 1.0
                        }
                    }
                }
            },
            success: {
                saturation: {
                    class: 'generalized_exponential',
                    parameters: {
                        sigma: 5,
                        gamma: 2,
                        scale: 1
                    }
                },
                mutator: {
                    efficiency: {
                        class: 'uniform_step',
                        parameters: {
                            increase_length: 0.1,
                            decrease_length: 1.0
                        }
                    },
                    resistance: {
                        class: 'uniform_step',
                        parameters: {
                            increase_length: 0.1,
                            decrease_length: 1.0
                        }
                    }
                }
            }
        }
    }
};

export const configurationFileInitialConfigurationMock = {
    initial_configuration: {
        class: 'cubic_crystal',
        default_attributes: {
            'birth': {
                'efficiency': 0.1,
                'resistance': 0.5
            },
            'death': {
                'efficiency': 0.1,
                'resistance': 0.5
            },
            'success': {
                'efficiency': 0.1,
                'resistance': 0.5
            },
            'mutation': {
                'id': 1
            }
        },
        parameters: {
            'dimension': 3,
            'radius': 2,
            'spacing': 1
        }
    }
};
