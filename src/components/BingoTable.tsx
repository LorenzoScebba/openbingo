import { Box, SimpleGrid, useMantineTheme } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../redux/hooks.ts";
import classes from "./BingoTable.module.css";
import { get } from "lodash";
import { seededShuffle } from "../utils/array.ts";
import {
  addHighlightedItem,
  removeHighlightedItem,
} from "../redux/slices/appSlice.ts";

const BingoTable = () => {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();
  const { size, seed, highlightedItems, textareaContent } = useAppSelector(
    (s) => s.app,
  );

  const values = seededShuffle(textareaContent.split("\n"), seed) as string[];

  return (
    <SimpleGrid id={"bingo"} cols={size} spacing={0} className={classes.grid}>
      {Array(size * size)
        .fill("")
        .map((_, i) => (
          <Box
            key={i}
            className={classes.card}
            onClick={() => {
              if (highlightedItems.includes(i)) {
                dispatch(removeHighlightedItem(i));
              } else {
                dispatch(addHighlightedItem(i));
              }
            }}
            style={{
              backgroundColor: highlightedItems.includes(i)
                ? theme.colors.pink[0]
                : "white",
            }}
          >
            {get(values, i, "")}
          </Box>
        ))}
    </SimpleGrid>
  );
};

export default BingoTable;
