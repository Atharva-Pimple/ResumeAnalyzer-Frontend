import * as Yup from 'yup';

export const ResumeSchema= Yup.object().shape({
  file: Yup.mixed()
    .required('Resume file is required')
    .test(
      'fileType',
      'Unsupported File Format. Please upload PDF, DOC, or DOCX.',
      (value) => {
        return value && ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(value.type);
      }
    )
});