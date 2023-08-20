import { Fade, Tooltip } from "@mui/material";

const HeaderTooltip = ({ title, children }) => {
  return <Tooltip
    title={title}
    TransitionComponent={Fade}
    TransitionProps={{ timeout: 600 }}
    arrow
  >
    <>
      {children}
    </>
  </Tooltip>;
}

export default HeaderTooltip;