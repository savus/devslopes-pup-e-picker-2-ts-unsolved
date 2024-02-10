import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import { DogsProvider } from "./Components/Providers/DogsProvider";
import { ActiveTabProvider } from "./Components/Providers/ActiveTabProvider";

export function App() {
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <ActiveTabProvider>
        <DogsProvider>
          <Section label={"Dogs: "}>
            <Dogs />
            <CreateDogForm />
          </Section>
        </DogsProvider>
      </ActiveTabProvider>
    </div>
  );
}
