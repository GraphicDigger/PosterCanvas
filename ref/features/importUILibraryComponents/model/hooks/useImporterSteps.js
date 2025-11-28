import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep, resetImporterState } from '../store/slice';
import {
  selectCurrentStep,
} from '../store/selectors';
import { IMPORT_STEPS } from '../constants/importSteps';

// Хук для управления логикой шагов импортера
export const useImporterSteps = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);

  const handleNext = () => {
    const currentIndex = IMPORT_STEPS.findIndex(s => s.id === currentStep);
    if (currentIndex < IMPORT_STEPS.length - 1) {
      const nextStep = IMPORT_STEPS[currentIndex + 1].id;
      dispatch(setCurrentStep(nextStep));
    }
  };

  const handleBack = () => {
    let prevStep = 'librarySelection';

    if (currentStep === 'componentSelection') {
      prevStep = 'librarySelection';
    }

    dispatch(setCurrentStep(prevStep));
  };


  return {
    currentStep,
    handleNext,
    handleBack,
  };
};
