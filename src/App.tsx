import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import { DogsProvider } from "./Components/Providers/DogsProvider";
import { ActiveTabProvider } from "./Components/Providers/ActiveTabProvider";
import { LoadingStateProvider } from "./Components/Providers/LoadingStateProvider";

export function App() {
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <ActiveTabProvider>
        <LoadingStateProvider>
          <DogsProvider>
            <Section label={"Dogs: "}>
              <Dogs />
              <CreateDogForm />
            </Section>
          </DogsProvider>
        </LoadingStateProvider>
      </ActiveTabProvider>
    </div>
  );
}
