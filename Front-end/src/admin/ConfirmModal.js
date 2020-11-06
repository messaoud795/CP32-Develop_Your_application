import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import "./CreateForm.css";


//modal style
function getModalStyle() {
  const top = 45;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

//modal logic
export default function ConfirmModal({
  open,
  handleOpen, deleteConfirm})
  { function handleSubmit(e) {
      e.preventDefault();
      deleteConfirm(true);
      handleOpen()
  }
  
  

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Please Confirm this operation </h2>
     
        <div className="createFormButtons">
          <button type="submit" className="create" onClick={handleSubmit}>
            confirm
          </button>
          <button onClick={handleOpen} className="cancel">
            Cancel
          </button>
        </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
