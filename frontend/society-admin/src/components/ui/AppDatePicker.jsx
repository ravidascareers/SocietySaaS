import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function AppDatePicker({

    label,

    value,

    onChange,

}) {

    return (

        <LocalizationProvider
            dateAdapter={AdapterDayjs}
        >

            <DatePicker

                label={label}

                value={
                    value
                        ? dayjs(value)
                        : null
                }

                onChange={(newValue) => {

                    onChange?.(
                        newValue
                            ? newValue.format(
                                "YYYY-MM-DD"
                            )
                            : ""
                    );

                }}

                slotProps={{

                    textField: {

                        fullWidth: true,

                        size: "small",
                    },

                }}

            />

        </LocalizationProvider>

    );

}

export default AppDatePicker;
