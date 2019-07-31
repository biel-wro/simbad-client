### Objects Definition

Parameters that can be defined in simulation configuration file are defined in `configurationSchema.json` file. Simulation files have tree structure and consist of several root objects that have multiple child objects, but for simplicity and reusability, in schema those parameters are defined as flat list.

```json
[
    "paramName1": {...},
    "paramName2": {...}
]
```

The order in which parameters are defined in schema does not matter, as long as all parameters that other parameters depend on are defined. There are several parameter types:

1. Simple - this parameter type consists of single floating, integer or string value. It cannot have any child parameters. Example of such parameters in simulation file - `sigma`, `gamma` and `scale` are simple parameters.

```json
"parameters": {
    "sigma": "5",
    "gamma": "2",
    "scale": "10"
}
```

Definition for such parameter in `configurationSchema.json` looks like this:

```json
"sigma": {
    "type": "simple",
    "description": "Some parameter description",
    "parameterType": "int",
    "minValue": 0,
    "maxValue": 1000,
    "defaultValue": 1
},
```

2. Enum - enum parameter is parameter that changes its child parameters based on its class - `saturation` is an example of such parameter - it has two possible classes `inverse_generalized_exponential` and `genralized_exponential`

```json
"saturation": {
    "class": "inverse_generalized_exponential",
    "parameters": {
        "sigma": "10",
        "gamma": "2",
        "scale": "1000"
    }
},
```

Same parameter with different class would look like this:

```
"saturation": {
    "class": "generalized_exponential",
    "parameters": {
        "sigma": "5",
        "gamma": "2",
        "scale": "10"
    }
}
```

Definition for such parameter in schema:

```json
"saturation": {
    "type": "enum",
    "description": "Some description",
    "possibleClasses": [
        "generalized_exponential",
        "inverse_generalized_exponential"
    ],
    "defaultValue": "generalized_exponential"
}
```

3. Complex - this parameter type has one or more simple, complex or enum children. In example below `generalized_exponential` is such parameter - it has 3 simple children.

```json
"saturation": {
    "class": "generalized_exponential",
    "parameters": {
        "sigma": "5",
        "gamma": "2",
        "scale": "10"
    }
},
```

`mutator` is an example of complex parameter with complex children :

```json
"mutator": {
    "efficiency": {
        "class": "uniform_step",
        "parameters": {
            "increase_length": "0.1",
            "decrease_length": "1.0"
        }
    },
    "resistance": {
        "class": "uniform_step",
        "parameters": {
            "increase_length": "0.1",
            "decrease_length": "1.0"
        }
    }
}
```

Definition of such parameter is analogous to enum parameter, but instead of `possibleClasses` that parameter can have, array of `childClasses` is defined:

```json
"mutator": {
    "type": "complex",
    "description": "Mutator description",
    "childClasses": ["efficiency", "resistance"]
},
```

### Schema validation

The `configurationSchema.json` file is added to program during build, and schema validity is checked during build. There are several build-time checks:

-   all classes in `possibleClasses` and `childClasses` must be defined in schema, to ensure that some parameter does not depend on non existing parameter.
