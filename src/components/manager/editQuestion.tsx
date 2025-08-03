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
interface IEditQuestionProps {
  id: string;
}
const EditQuestion: React.FC<IEditQuestionProps> = ({ id }) => {
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const closeRef = useRef<HTMLButtonElement>(null);
  const handleUpdateQuestion = async (id: string) => {
    const upDateRes = await questionService.updateQuestionAPI(
      id,
      correctAnswer
    );
    if (upDateRes.data?.modifiedCount) {
      message.success("Question updated");
      closeRef.current?.click();
      return;
    }
    message.error("Question updated failed!");
    closeRef.current?.click();
  };
  return (
    <>
      <div>
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
        <div className="flex float-end gap-1">
          <Button
            onClick={() => handleUpdateQuestion(id)}
            className="mt-5 cursor-pointer"
          >
            Update
          </Button>
          <DialogClose ref={closeRef}>
            <Button variant="outline" className="mt-5 cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
        </div>
      </div>
    </>
  );
};

export default EditQuestion;
