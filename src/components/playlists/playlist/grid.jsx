import * as React from "react";
import '../style.scss';

export default function Grid({grid}) {
  return (
    <div className="grid">
      {
        grid.map(
          (squareColor,i) => (
            <div 
              className="square" 
              style={{backgroundColor: squareColor}} 
              key={i}
            ></div>)
        )
      }
    </div>
  );
}

