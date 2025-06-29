export const getVarEnv = () => {
  import.meta.env;

  return {
    ...import.meta.env,
  };
};
