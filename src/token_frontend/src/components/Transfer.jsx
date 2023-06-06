import React, { useState } from "react";
import { token_backend } from "../../../declarations/token_backend/index";
import { Principal } from "@dfinity/principal";

function Transfer() {
  
const [recipientId , setId] = useState("");
const [amount , setAmount] = useState("");
const [isDisabled , setDisable] = useState(false);
const [feedback , setFeedback] = useState("");


  async function handleClick() {
    setDisable(true);
    const recipent = Principal.fromText(recipientId);
    const amountToTransfer = Number(amount);
    const result = await token_backend.transfer(recipent , amountToTransfer);
    setFeedback(result);
    setDisable(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e) => setId(e.target.value)}

              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
            Transfer
          </button>
        </p>
        <p>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
