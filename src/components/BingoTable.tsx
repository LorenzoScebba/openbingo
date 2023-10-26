import { Box, SimpleGrid } from "@mantine/core";
import { useAppSelector } from "../redux/hooks.ts";
import classes from "./BingoTable.module.css";
import { get } from "lodash";
import { seededShuffle } from "../utils/array.ts";

const BingoTable = () => {
  const size = useAppSelector((s) => s.app.size);
  const seed = useAppSelector((s) => s.app.seed);
  const value = useAppSelector((state) => state.app.textareaContent);
  const values = seededShuffle(value.split("\n"), seed) as string[];

  return (
    <SimpleGrid id={"bingo"} cols={size} spacing={0} className={classes.grid}>
      {Array(size * size)
        .fill("")
        .map((_, i) => (
          <Box key={i} className={classes.card}>
            {get(values, i, "")}
          </Box>
        ))}
    </SimpleGrid>
  );
};

export default BingoTable;
