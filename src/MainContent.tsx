import {
  Button,
  Flex,
  Group,
  JsonInput,
  Modal,
  NumberInput,
} from "@mantine/core";
import { useAppDispatch, useAppSelector } from "./redux/hooks.ts";
import {
  clearHighlightedItems,
  randomizeSeed,
  setSeed,
  setSize,
  setTextareaContent,
} from "./redux/slices/appSlice.ts";
import BingoTable from "./components/BingoTable.tsx";
import BingoTextAreaInput from "./components/BingoTextAreaInput.tsx";
import { toPng } from "html-to-image";
import FileSaver from "file-saver";
import { useDisclosure } from "@mantine/hooks";
import classes from "./MainContent.module.css";

const MainContent = () => {
  const dispatch = useAppDispatch();
  const [opened, { toggle, close }] = useDisclosure(false);
  const { size, seed, textareaContent } = useAppSelector((s) => s.app);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Import">
        <JsonInput
          onChange={(v) => {
            try {
              const values = JSON.parse(v);
              if (values["size"]) dispatch(setSize(values["size"]));
              if (values["seed"]) dispatch(setSeed(values["seed"]));
              if (values["textareaContent"])
                dispatch(setTextareaContent(values["textareaContent"]));

              close();
            } catch (e) {
              /* empty */
            }
          }}
        />
      </Modal>
      <Group align={"flex-end"} mt={16}>
        <NumberInput
          value={size}
          onChange={(v) => {
            if (Number.isInteger(v)) dispatch(setSize(+v));
          }}
          label={"Size"}
          min={3}
          max={10}
        />
        <NumberInput
          value={seed}
          onChange={(v) => {
            if (Number.isInteger(v)) dispatch(setSeed(+v));
          }}
          label={"Seed"}
        />
        <Button color={"purple"} onClick={() => dispatch(randomizeSeed())}>
          Randomize!
        </Button>
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
        <Button
          color={"red"}
          onClick={() => {
            dispatch(clearHighlightedItems());
          }}
        >
          Reset progress
        </Button>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(
              JSON.stringify({ size, seed, textareaContent }),
            );
          }}
        >
          Export
        </Button>
        <Button onClick={toggle}>Import</Button>
      </Group>
      <Flex mt={16} gap={16} className={classes.flex}>
        <BingoTable />
        <BingoTextAreaInput />
      </Flex>
    </>
  );
};

export default MainContent;
