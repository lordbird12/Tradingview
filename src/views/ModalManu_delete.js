import React, { useState } from 'react';
import { Button} from 'reactstrap';


const ModalManu_delete = (props) => {
  const {
  
    select,
    handleManuDelete,
    manuEdit_11
  } = props;


 
  const [ edit,setEdit] = useState(select);

 
  const btn = () => { 
    setEdit(!edit);
    handleManuDelete();
}

  return (
    <div>
      <Button color={edit?"btn btn-info":"btn btn-danger"} onClick={btn} size = 'sm' style={{ width: 35 }} > {edit?<i className="fa fa-unlock"></i>:<i class="fa fa-lock"></i>}</Button>

    </div>
  );
}

export default ModalManu_delete;