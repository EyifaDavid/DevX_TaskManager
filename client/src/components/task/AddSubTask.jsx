import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Button from "../Button";
import { toast } from "sonner";
import { useCreateSubTaskMutation, useUpdateSubTaskMutation } from "../../redux/slices/api/taskApiSlice";
import { useEffect } from "react";

const AddSubTask = ({ open, setOpen, id, subtask = null }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
  defaultValues: {
    title: subtask?.title || "",
    date: subtask?.date || "",
    tag: subtask?.tag || "",
  },
});

    useEffect(() => {
      reset({
        title: subtask?.title || "",
        date: subtask?.date || "",
        tag: subtask?.tag || "",
      });
    }, [subtask, reset]);

  const [addSbTask] = useCreateSubTaskMutation();
  const [updateSbTask] = useUpdateSubTaskMutation();
  const isEditMode = Boolean(subtask && subtask._id);

const handleOnSubmit = async (data) => {
  try {
    let res;
    if (isEditMode) {
      // Edit mode
      console.log("Updating subtask with ID:", subtask?._id);
      res = await updateSbTask({ id: subtask._id, data}).unwrap();
    } else {
      // Add mode
      res = await addSbTask({ data, id }).unwrap();
    }
    toast.success(res.message);
    setTimeout(() => {
      setOpen(false);
      window.location.reload(); // optional, but inefficient
    }, 500);
  } catch (err) {
    console.log(err);
    toast.error(err?.data?.message || err.error);
  }
};


  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
                <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            {subtask ? "EDIT SUB-TASK" : "ADD SUB-TASK"}
          </Dialog.Title>
          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Sub-Task title'
              type='text'
              name='title'
              label='Title'
              className='w-full rounded'
              register={register("title", {
                required: "Title is required!",
              })}
              error={errors.title ? errors.title.message : ""}
            />

            <div className='flex items-center gap-4'>
              <Textbox
                placeholder='Date'
                type='date'
                name='date'
                label='Task Date'
                className='w-full rounded'
                register={register("date", {
                  required: "Date is required!",
                })}
                error={errors.date ? errors.date.message : ""}
              />
              <Textbox
                placeholder='Tag'
                type='text'
                name='tag'
                label='Tag'
                className='w-full rounded'
                register={register("tag", {
                  required: "Tag is required!",
                })}
                error={errors.tag ? errors.tag.message : ""}
              />
            </div>
          </div>
          <div className='py-3 mt-4 flex sm:flex-row-reverse gap-4'>
            <Button
              type='submit'
              className='bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 sm:ml-3 sm:w-auto'
              label={subtask ? "Update Task" : "Add Task"}
            />

            <Button
              type='button'
              className='bg-white border text-sm font-semibold text-gray-900 sm:w-auto'
              onClick={() => setOpen(false)}
              label='Cancel'
            />
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddSubTask;
