import { Textarea } from "@mantine/core";
import classes from "./BingoTextAreaInput.module.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks.ts";
import { setTextareaContent } from "../redux/slices/appSlice.ts";

const BingoTextAreaInput = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.app.textareaContent);
  return (
    <Textarea
      value={value}
      onChange={(e) => {
        dispatch(setTextareaContent(e.currentTarget.value));
      }}
      classNames={{
        root: classes.root,
        wrapper: classes.wrapper,
        input: classes.input,
      }}
    />
  );
};

export default BingoTextAreaInput;
