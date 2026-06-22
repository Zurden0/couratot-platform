Файлы react компонентов

```js
import {useState} from "react";
import "./css/style.css";

const ComponentName = () => {
  const [variable, function_to_update_variable] = useState(0);

  return (
    <div>
      <h2>Клики: {variable}</h2>

      <button onClick={() => function_to_update_variable(variable + 1)}>
        Кликни меня
      </button>
    </div>
  );
};

export default ComponentName;
```