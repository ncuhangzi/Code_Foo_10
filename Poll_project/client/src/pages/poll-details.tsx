import { Typography, Box, Stack, Button, Grid} from "@mui/material";
import { useUpdate, useDelete, useGetIdentity, useShow } from "@refinedev/core";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import {
    ChatBubble,
    Delete,
    Edit,
    Phone,
    Place,
} from "@mui/icons-material";

import { CustomButton } from "components";


function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
}

const PollDetails = () => {
    const [selectedButton, setSelectedButton] = useState<string | null>(null);
    const [isVote, setIsVote] = useState(Boolean);
    const handleButtonClick = (label: string) => {
      setSelectedButton(label === selectedButton ? null : label);
    };
    const navigate = useNavigate();
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: true,
    });
    const { queryResult } = useShow();
    const { mutate: deleteMutate } = useDelete();
    const { mutate: updateMutate } = useUpdate();
    const { id } = useParams();

    const { data, isLoading, isError } = queryResult;

    const pollDetails = data?.data ?? {};

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong!</div>;
    }

    const isCurrentUser = user.email === pollDetails.creator.email;

    const handleDeletePoll = () => {
        const response = window.confirm(
            "Are you sure you want to delete this poll card?",
        );
        if (response) {
            deleteMutate(
                {
                    resource: "polls",
                    id: id as string,
                },
                {
                    onSuccess: () => {
                        navigate("/polls");
                    },
                },
            );
        }
    };
    const handleVote = (label: string | null) => {
        pollDetails.option.map((value:{label:'',votes:0}, index:number)=>(
            (value.label === label)? value.votes++:value.votes
        ));
        const total = pollDetails.option.reduce((acc:number, curr:{label:'',votes:0}) => acc + curr.votes, 0)
        updateMutate({
            resource:"polls",
            id: id as string,
            values:{
                title:pollDetails.title,
                option:pollDetails.option,
                topicType:pollDetails.topicType,
                votes:total,
                photo:pollDetails.photo,
            }

        },
        {
            onSuccess: () =>{
                setIsVote(true)
            }
        }
        );
        // try{
        //     const res = await axios.put('api/v1/polls/vote',{
        //         label: selectedButton,
        //     });
        //     const updatedOption = res.data;
        //     const updatedOptions = options.map((option, i) =>
        //     i === index ? updatedOption : option
        //   );
            //setSelectedOption(index);
            // setIsVote(true)
            //setOptions(updatedOptions);
        // }catch (error) {
        //     console.error(error);
        // }
        // mutate(
        //     {
        //         resource: "polls",
        //         id: id as string,
        //     },
        //     {
        //         onSuccess: () => {
        //             setIsVote(true)
        //         },
        //     },
        // );

    };
    return (
        <Box
            borderRadius="15px"
            padding="20px"
            bgcolor="#FCFCFC"
            width="fit-content"
        >
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                Polling Details
            </Typography>

            <Box
                mt="20px"
                display="flex"
                flexDirection={{ xs: "column", lg: "row" }}
                gap={4}
            >
                <Box flex={1} maxWidth={764}>
                    <img
                        src={pollDetails.photo}
                        alt="poll_details-img"
                        height={546}
                        style={{ objectFit: "cover", borderRadius: "10px" }}
                        className="poll_details-img"
                    />

                    <Box mt="15px">
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            flexWrap="wrap"
                            alignItems="center"
                        >
                            <Typography
                                fontSize={18}
                                fontWeight={500}
                                color="#11142D"
                                textTransform="capitalize"
                            >
                                {pollDetails.topicType}
                            </Typography>
                        </Stack>

                        <Stack
                            direction="row"
                            flexWrap="wrap"
                            justifyContent="space-between"
                            alignItems="center"
                            gap={2}
                        >
                            <Box>
                                <Typography
                                    fontSize={22}
                                    fontWeight={600}
                                    mt="10px"
                                    color="#11142D"
                                >
                                    {pollDetails.title}
                                </Typography>
                                <Stack
                                    mt={0.5}
                                    direction="row"
                                    alignItems="center"
                                    gap={0.5}
                                >
                                </Stack>
                            </Box>

                            <Box>
                                <Typography
                                    fontSize={16}
                                    fontWeight={600}
                                    mt="10px"
                                    color="#11142D"
                                >
                                    Votes
                                </Typography>
                                <Stack
                                    direction="row"
                                    alignItems="flex-end"
                                    gap={1}
                                >
                                    <Typography
                                        fontSize={25}
                                        fontWeight={700}
                                        color="#475BE8"
                                    >
                                        {pollDetails.votes}
                                    </Typography>
                                    <Typography
                                        fontSize={14}
                                        color="#808191"
                                        mb={0.5}
                                    >
                                        participants
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>

                        <Stack mt="25px" direction="column" gap="10px">
                            <Typography fontSize={18} color="#11142D">
                                Options
                            </Typography>
                            <Typography fontSize={14} color="#808191">
                            <Stack
                                direction="column"
                                gap={1}
                                justifyContent="center"
                                mb={2}
                            >

                                {pollDetails.option.map((value:{label:'',votes:0}, index:number) => (
                                    <Button
                                    key={index}
                                    disabled={isVote?true:false}
                                    //label={`Options ${index + 1}`}
                                    //value={value.label}
                                    onClick={()=>handleButtonClick(value.label)}
                                    sx={{
                                        borderRadius: 25,
                                        border: "4px solid #bf1313",
                                        fontSize: 16,
                                        fontWeight: 600,
                                        gap: "10px",
                                        color: value.label === selectedButton ? '#fcfcfc' : '#000000',
                                        backgroundColor: value.label === selectedButton ? '#bf1313' : '#fcfcfc',
                                        "&:hover": {
                                            backgroundColor:'#bf1313',
                                            color: '#fcfcfc'
                                        },
                                    }}
                                    // onChange={(event) => handleChange(index, event.target.value)}
                                    >
                                        <Grid xs={6} md={6}>
                                            {value.label}
                                        </Grid>
                                        <Grid xs={6} md={4}></Grid>
                                        <Grid xs={6} md={2}>
                                            {!isVote?'':+(value.votes/pollDetails.votes*100).toFixed(2)+'%'}
                                        </Grid>
                                                                                                     
                                    </Button>
                                ))}
                            </Stack>
                            </Typography>
                        </Stack>
                        <Box>
                        <CustomButton
                            title="Vote!"
                            disabled={isVote}
                            backgroundColor="#bf1313"
                            color="#FCFCFC"
                            fullWidth
                            handleClick={() => handleVote(selectedButton)}
                        />
                    </Box>
                    </Box>
                </Box>

                <Box
                    width="100%"
                    flex={1}
                    maxWidth={326}
                    display="flex"
                    flexDirection="column"
                    gap="20px"
                >
                    <Stack
                        width="100%"
                        p={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        border="1px solid #E4E4E4"
                        borderRadius={2}
                    >
                        <Stack
                            mt={2}
                            justifyContent="center"
                            alignItems="center"
                            textAlign="center"
                        >
                            <img
                                src={
                                    checkImage(pollDetails.creator.avatar)
                                        ? pollDetails.creator.avatar
                                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                                }
                                alt="avatar"
                                width={90}
                                height={90}
                                style={{
                                    borderRadius: "100%",
                                    objectFit: "cover",
                                }}
                            />

                            <Box mt="15px">
                                <Typography
                                    fontSize={18}
                                    fontWeight={600}
                                    color="#11142D"
                                >
                                    {pollDetails.creator.name}
                                </Typography>
                                <Typography
                                    mt="5px"
                                    fontSize={14}
                                    fontWeight={400}
                                    color="#808191"
                                >
                                    {!isCurrentUser ? "User" : "Creator"}
                                </Typography>
                            </Box>

                            <Stack
                                mt="15px"
                                direction="row"
                                alignItems="center"
                                gap={1}
                            >
                                <Place sx={{ color: "#808191" }} />
                                <Typography
                                    fontSize={14}
                                    fontWeight={400}
                                    color="#808191"
                                >
                                    Massachusetts, USA
                                </Typography>
                            </Stack>

                            <Typography
                                mt={1}
                                fontSize={16}
                                fontWeight={600}
                                color="#11142D"
                            >
                                {pollDetails.creator.allPolls.length}{" "}
                                Polls
                            </Typography>
                        </Stack>

                        <Stack
                            width="100%"
                            mt="25px"
                            direction="row"
                            flexWrap="wrap"
                            gap={2}
                        >
                            <CustomButton
                                title={!isCurrentUser ? "Message" : "Edit"}
                                backgroundColor="#475BE8"
                                color="#FCFCFC"
                                fullWidth
                                icon={
                                    !isCurrentUser ? <ChatBubble /> : <Edit />
                                }
                                handleClick={() => {
                                    if (isCurrentUser) {
                                        navigate(
                                            `/polls/edit/${pollDetails._id}`,
                                        );
                                    }
                                }}
                            />
                            <CustomButton
                                title={!isCurrentUser ? "Call" : "Delete"}
                                backgroundColor={
                                    !isCurrentUser ? "#2ED480" : "#d42e2e"
                                }
                                color="#FCFCFC"
                                fullWidth
                                icon={!isCurrentUser ? <Phone /> : <Delete />}
                                handleClick={() => {
                                    if (isCurrentUser) handleDeletePoll();
                                }}
                            />
                        </Stack>
                    </Stack>


                </Box>
            </Box>
        </Box>
    );
};

export default PollDetails;
