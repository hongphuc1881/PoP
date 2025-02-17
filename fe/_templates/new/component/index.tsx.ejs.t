---
to: <%= output_path %>/index.tsx
---
import { ReactNode } from "react";
import styles from "./styles.module.css";

type Props = {
  children?: ReactNode
}

export const <%= component_name %> = ({children}: Props) => {
  return <div className={styles.module}>
   {children}
  </div>
}

