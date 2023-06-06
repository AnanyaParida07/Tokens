import React, { useState } from "react";
import { token_backend , canisterId , createActor } from "../../../declarations/token_backend/index";
import { AuthClient } from "@dfinity/auth-client";


function Faucet() {

  const [isDisabled, setDisable] = useState(false);
  const [buttonText, setText] = useState("Gimme gimme");
  async function handleClick(event) {
    setDisable(true);
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });


    setText(await token_backend.payOut());
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free D-ANA tokens here! Claim 10,000 D-ANA coins to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
