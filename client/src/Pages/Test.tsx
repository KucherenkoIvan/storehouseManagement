import React from "react";
import { Link } from 'react-router-dom';

const Test: React.FC = () => {

  return (
    <div>
      <Link to='/test'>Test</Link>
      <br/>
      <Link to='/'>Root</Link>
    </div>
  );
}

export default Test;
