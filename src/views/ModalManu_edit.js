import React, { useState } from 'react';
import { Button} from 'reactstrap';


const ModalManu_edit = (props) => {
  const {
  
    select,
    handleManuEdit,
  } = props;


 
  const [ edit,setEdit] = useState(select);

 
  const btn = () => { 
    setEdit(!edit);
    handleManuEdit();
}

  return (
    <div>
      <Button color={edit?"btn btn-info":"btn btn-danger"} onClick={btn} size = 'sm' style={{ width: 35 }}   > {edit?<i className="fa fa-unlock"></i>:<i className="fa fa-lock"></i>}</Button>

    </div>
  );
}

export default ModalManu_edit;