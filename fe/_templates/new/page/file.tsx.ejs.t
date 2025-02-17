---
to: <%= output_path %>/index.tsx
---
import { isMobile } from 'react-device-detect';
import { <%= pc_component_name %> } from "./pc"
import { <%= sp_component_name %> } from "./sp"

function <%= page_name %>() {
  return <>{isMobile ? <<%= sp_component_name %> /> : <<%= pc_component_name %> />}</>;
}

export default <%= page_name %>;
