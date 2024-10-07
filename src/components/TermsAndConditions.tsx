import { useState } from "react"

const TermsAndConditions = () => {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div>
      <h1>Terms & Conditions</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem,
        delectus.
      </p>
      <div>
        <label htmlFor="agree">
          <input
            type="checkbox"
            id="agree"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          I accept the terms and conditions.
        </label>
      </div>
      <button disabled={!isChecked}>Submit</button>
    </div>
  )
}

export default TermsAndConditions
