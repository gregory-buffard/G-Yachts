import {useRef} from "react";
import {Button} from "@nextui-org/react";
import {FaArrowsSpin} from "react-icons/fa6";
import {replaceDestinationImage} from "@/actions/destination";

const FileUpload = ({id, name, setImages}: { id: string, name: string, setImages:any}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click(); // Programmatically trigger the file input
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target === null) return;
                const base64String = e.target.result;
                setImages((prev: any) => {
                    return {...prev, [name]: base64String}
                })
                replaceDestinationImage(id, name, base64String as string)
                    .catch((e: any) => {
                        console.log(e)
                    })


            }
            reader.readAsDataURL(file);
        }

    };

    return (
        <div>
            <Button onClick={handleButtonClick} isIconOnly><FaArrowsSpin/></Button>
            <input
                type="file"
                ref={fileInputRef}
                style={{display: 'none'}}
                onChange={handleFileChange}
            />
        </div>
    )
}

export default FileUpload;