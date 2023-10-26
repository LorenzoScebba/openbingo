import { Button, Flex, Group, NumberInput } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "./redux/hooks.ts";
import { randomizeSeed, setSize } from "./redux/slices/appSlice.ts";
import BingoTable from "./components/BingoTable.tsx";
import BingoTextAreaInput from "./components/BingoTextAreaInput.tsx";
import { toPng } from "html-to-image";
import FileSaver from "file-saver";

const MainContent = () => {
  const dispatch = useAppDispatch();
  const size = useAppSelector((s) => s.app.size);

  const updateSize = (x: number) => {
    dispatch(setSize(x));
  };

  return (
    <>
      <Group align={"center"} mt={16}>
        <NumberInput
          value={size}
          onChange={(v) => {
            if (Number.isInteger(v)) updateSize(+v);
          }}
          placeholder={"Size"}
          min={3}
          max={10}
        />
        <Button onClick={() => dispatch(randomizeSeed())}>Randomize!</Button>
        <Button
          onClick={() => {
            toPng(document.getElementById("bingo") as HTMLElement).then(
              function (dataUrl) {
                FileSaver.saveAs(dataUrl, "bingo.png");
              },
            );
          }}
        >
          Save as Png
        </Button>
      </Group>
      <Flex mt={16} gap={16}>
        <BingoTable />
        <BingoTextAreaInput />
      </Flex>
    </>
  );
};

export default MainContent;
