import React, { useState } from 'react';
import { Button} from 'reactstrap';


const ModalManu_save= (props) => {
  const {
  
    select,
    handleManuSave,
  } = props;


 
  const [ edit,setEdit] = useState(select);

 
  const btn = () => { 
    setEdit(!edit);
    handleManuSave();
}

  return (
    <div>
      <Button color={edit?"btn btn-info":"btn btn-danger"} onClick={btn} size = 'sm' style={{ width: 35 }}  > {edit?<i className="fa fa-unlock"></i>:<i class="fa fa-lock"></i>}</Button>

    </div>
  );
}

export default ModalManu_save;