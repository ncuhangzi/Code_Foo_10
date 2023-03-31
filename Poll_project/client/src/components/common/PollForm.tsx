import {
    Box,
    Typography,
    FormControl,
    FormHelperText,
    TextField,
    Stack,
    Select,
    MenuItem,
    Button,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { FormProps, TextFieldsProps } from "interfaces/common";
import CustomButton from "./CustomButton";
import React, { useState } from 'react';

const PollForm = ({
    type,
    register,
    handleSubmit,
    handleImageChange,
    formLoading,
    onFinishHandler,
    propertyImage,
    handleOptionChange,
}: FormProps) => {
    const [textFields, setTextFields] = useState<TextFieldsProps[]>([{ label: '' , votes:0}]);
    const handleAddTextField = () => {
        const newTextField = [...textFields, { label: '' , votes:0}];
        setTextFields(newTextField);
        handleOptionChange(newTextField);
        console.log(newTextField);
    };

    const handleRemoveTextField = (index: number) => () => {
        const newTextField = [...textFields];
        newTextField.splice(index, 1);
        setTextFields(newTextField);
        handleOptionChange(newTextField);
        //console.log(newTextField);
      };

    const handleTextFieldChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTextField = [...textFields];
        newTextField[index].label = event.target.value;
        setTextFields(newTextField);
        handleOptionChange(newTextField);
        //console.log(newTextField);
    };

    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142d">
                {type} a Poll
            </Typography>

            <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
                <form
                    style={{
                        marginTop: "20px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                    onSubmit={handleSubmit(onFinishHandler)}
                >
                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Title
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            id="outlined-basic"
                            placeholder="Add a title for this poll"
                            color="info"
                            variant="outlined"
                            {...register("title", { required: true })}
                        />
                    </FormControl>
                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Add Options
                        </FormHelperText>
                        {textFields.map((textField, index) => (
                            <Box key={index} mb={1}>
                                 <Stack direction="row" gap={2}>
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-basic"
                                        variant="outlined"
                                        placeholder={`Option ${index+1}`}
                                        color="info"
                                        label={`Option ${index + 1}`}
                                        value={textField.label}
                                        onChange={handleTextFieldChange(index)}
                                        //{...register("option", { required: true })}
                                    >
                                    <input
                                        hidden
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) => {
                                            handleOptionChange(textFields);
                                        }}
                                    />                                      
                                    </TextField>
                                    <Button 
                                        sx={{
                                            backgroundColor: "#bf1313",
                                            color: "#fcfcfc" ,
                                            borderRadius: 12,
                                            "&:hover": {
                                                opacity: 0.9,
                                                backgroundColor:"#ed2626",
                                            }
                                        }} 
                                        onClick={handleRemoveTextField(index)}>
                                        {<Remove/>}
                                    </Button>
                                 </Stack>

                            </Box>
                        ))}
                        {/* {pollOptions = textFields} */}
                        <Button
                            type="button"
                            sx={{
                                flex:1,
                                padding: "10px 15px",
                                width: "8%",
                                minWidth: 130,
                                borderRadius: 8,
                                backgroundColor: "#bf1313",
                                color: "#fcfcfc" ,
                                fontSize: 16,
                                fontWeight: 600,
                                gap: "10px",
                                textTransform: "capitalize",
                                "&:hover": {
                                    opacity: 0.9,
                                    backgroundColor:"#ed2626",
                                },
                            }}
                            onClick={handleAddTextField}
                        >
                            {<Add/>}
                        </Button>
                    </FormControl>

                    <Stack direction="row" gap={4}>
                        <FormControl sx={{ flex: 1 }}>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "10px 0",
                                    fontSize: 16,
                                    color: "#11142d",
                                }}
                            >
                                Select Topic Type
                            </FormHelperText>
                            <Select
                                variant="outlined"
                                color="info"
                                displayEmpty
                                required
                                inputProps={{ "aria-label": "Without label" }}
                                defaultValue="game"
                                {...register("topicType", {
                                    required: true,
                                })}
                            >  
                                <MenuItem value="game">Game</MenuItem>
                                <MenuItem value="movie">Movie</MenuItem>
                                <MenuItem value="tvshow">TV Show</MenuItem>
                                <MenuItem value="tech">Tech</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>

                    <Stack
                        direction="column"
                        gap={1}
                        justifyContent="center"
                        mb={2}
                    >
                        <Stack direction="row" gap={2}>
                            <Typography
                                color="#11142d"
                                fontSize={16}
                                fontWeight={500}
                                my="10px"
                            >
                                Display Photo
                            </Typography>

                            <Button
                                component="label"
                                sx={{
                                    width: "fit-content",
                                    color: "#2ed480",
                                    textTransform: "capitalize",
                                    fontSize: 16,
                                }}
                            >
                                Upload * [Max: 10 MB]
                                <input
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) => {
                                        handleImageChange(e.target.files![0]);
                                    }}
                                />
                            </Button>
                        </Stack>
                        <Typography
                            fontSize={14}
                            color="#808191"
                            sx={{ wordBreak: "break-all" }}
                        >
                            {propertyImage?.name}
                        </Typography>
                    </Stack>

                    <CustomButton
                        type="submit"
                        title={formLoading ? "Submitting..." : "Submit"}
                        backgroundColor="#bf1313"
                        color="#fcfcfc"
                    />
                </form>
            </Box>
        </Box>
    );
};

export default PollForm;
