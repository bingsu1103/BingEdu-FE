import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import questionService from "@/services/question.service";
import { message } from "antd";
import { DialogClose } from "@radix-ui/react-dialog";
import uploadService from "@/services/upload.service";
import { Upload } from "lucide-react";

interface IEditQuestionProps {
  id: string;
}

const EditQuestion: React.FC<IEditQuestionProps> = ({ id }) => {
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [previewAudio, setPreviewAudio] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleUpdateQuestion = async (id: string) => {
    try {
      let imageUrl = "";
      let audioUrl = "";

      if (imageFile) {
        const imgRes = await uploadService.uploadFile(imageFile);
        imageUrl = imgRes.data?.url || "";
      }

      if (audioFile) {
        const audioRes = await uploadService.uploadAudio(audioFile);
        audioUrl = audioRes.data?.url || "";
      }

      const updateRes = await questionService.updateQuestionAPI(id, {
        correct_answer_key: correctAnswer,
        imageUrl,
        audioUrl,
      });

      if (updateRes.data?.modifiedCount) {
        message.success("Question updated");
        closeRef.current?.click();
        return;
      }

      message.error("Question update failed!");
    } catch (error) {
      console.error(error);
      message.error("An error occurred during update.");
    } finally {
      closeRef.current?.click();
    }
  };

  return (
    <div className="space-y-5">
      {/* Answer selection */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Select correct answer
        </label>
        <Select value={correctAnswer} onValueChange={setCorrectAnswer}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select answer" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Correct Answer</SelectLabel>
              <SelectItem value="A">A</SelectItem>
              <SelectItem value="B">B</SelectItem>
              <SelectItem value="C">C</SelectItem>
              <SelectItem value="D">D</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Upload image */}
      <div>
        <label className="block text-sm font-medium mb-1">Upload Image</label>
        <label className="flex items-center gap-2 cursor-pointer w-fit px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition">
          <Upload size={16} />
          <span>Upload Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setImageFile(file);
              if (file) {
                setPreviewImg(URL.createObjectURL(file));
              }
            }}
            className="hidden"
          />
        </label>
        {previewImg && (
          <div className="mt-2">
            <img
              src={previewImg}
              alt="Preview"
              className="w-full max-h-48 object-contain rounded border"
            />
            <p className="text-sm mt-1 text-gray-500">{imageFile?.name}</p>
          </div>
        )}
      </div>

      {/* Upload audio */}
      <div>
        <label className="block text-sm font-medium mb-1">Upload Audio</label>
        <label className="flex items-center gap-2 cursor-pointer w-fit px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition">
          <Upload size={16} />
          <span className="">Upload Audio</span>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setAudioFile(file);
              if (file) {
                setPreviewAudio(URL.createObjectURL(file));
              }
            }}
            className="hidden"
          />
        </label>
        {previewAudio && (
          <div className="mt-2">
            <audio controls src={previewAudio} className="w-full" />
            <p className="text-sm mt-1 text-gray-500">{audioFile?.name}</p>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex justify-end gap-2 pt-4">
        <Button
          onClick={() => handleUpdateQuestion(id)}
          className="cursor-pointer"
        >
          Update
        </Button>
        <DialogClose ref={closeRef}>
          <Button variant="outline" className="cursor-pointer">
            Cancel
          </Button>
        </DialogClose>
      </div>
    </div>
  );
};

export default EditQuestion;
