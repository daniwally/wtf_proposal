import "@/App.css";
import { Toaster } from "@/components/ui/sonner";
import ProposalLanding from "@/components/ProposalLanding";

function App() {
  return (
    <div className="App">
      <ProposalLanding />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
