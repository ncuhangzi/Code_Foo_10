import { useList } from "@refinedev/core";
import { Typography, Box } from "@mui/material";

import {
    PollCard,
} from "components";

const Home = () => {
    const { data, isLoading, isError } = useList({
        resource: "polls",
        config: {
            pagination: {
                pageSize: 20,
            },
        },
    });

    const latestPolls = data?.data ?? [];

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Something went wrong!</Typography>;

    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                Home
            </Typography>

            <Box
                flex={1}
                borderRadius="15px"
                padding="20px"
                bgcolor="#fcfcfc"
                display="flex"
                flexDirection="column"
                minWidth="100%"
                mt="25px"
            >
                <Typography fontSize="18px" fontWeight={600} color="#11142d">
                    Latest 20 Polls
                </Typography>

                <Box
                    mt={2.5}
                    sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}
                >
                    {latestPolls.map((poll) => (
                        <PollCard
                            key={poll._id}
                            id={poll._id}
                            title={poll.title}
                            votes={poll.votes}
                            photo={poll.photo}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
