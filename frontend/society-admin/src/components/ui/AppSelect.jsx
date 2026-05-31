import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";

function AppSelect({

    label = "",

    name = "",

    value = "",

    options = [],

    onChange,

    fullWidth = true,

}) {

    return (

        <FormControl
            fullWidth={fullWidth}
            size="small"
        >

            <InputLabel>
                {label}
            </InputLabel>

            <Select

                label={label}

                name={name}

                value={value ?? ""}

                onChange={onChange}

            >

                {options.map(
                    (option) => (

                        <MenuItem

                            key={
                                option.value
                            }

                            value={
                                option.value
                            }
                        >

                            {
                                option.label
                            }

                        </MenuItem>

                    )
                )}

            </Select>

        </FormControl>

    );

}

export default AppSelect;