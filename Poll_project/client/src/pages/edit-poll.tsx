import { useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import PollForm from "components/common/PollForm";

const CreatePoll = () => {
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: true,
    });
    const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
    } = useForm();

    const [pollOptions, setPollOptions] = useState([{label:'', votes:0}]);
    const handleOptionChange = (array: Array<{label:'', votes:0}>) =>{
        setPollOptions(array);
    }
    const handleImageChange = (file: File) => {
        const reader = (readFile: File) =>
            new Promise<string>((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.onload = () => resolve(fileReader.result as string);
                fileReader.readAsDataURL(readFile);
            });

        reader(file).then((result: string) =>
            setPropertyImage({ name: file?.name, url: result }),
        );
    };

    const onFinishHandler = async (data: FieldValues) => {
        if (!propertyImage.name) return alert("Please upload a property image");

        await onFinish({
            ...data,
            photo: propertyImage.url,
            email: user.email,
            option: pollOptions,
            votes: pollOptions.reduce((acc, curr) => acc + curr.votes, 0),
        });
    };

    return (
        <PollForm
            type="Edit"
            register={register}
            onFinish={onFinish}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            handleImageChange={handleImageChange}
            onFinishHandler={onFinishHandler}
            propertyImage={propertyImage}
            handleOptionChange={handleOptionChange}
        />
    );
};

export default CreatePoll;
