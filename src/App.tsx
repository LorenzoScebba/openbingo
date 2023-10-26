import "@mantine/core/styles.css";

import { AppShell, MantineProvider, Title } from "@mantine/core";
import MainContent from "./MainContent.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

export default function App() {
  return (
    <Provider store={store}>
      <MantineProvider>
        <AppShell header={{ height: 60 }}>
          <AppShell.Header p="md">
            <Title order={2}>Open Bingo!</Title>
          </AppShell.Header>

          <AppShell.Main px="md" mt={8}>
            <MainContent />
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </Provider>
  );
}
