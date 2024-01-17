import React, {useEffect} from 'react';
import CodePush, {DownloadProgress} from 'react-native-code-push';

export const useCodePush = () => {
  const [progress, setProgress] = React.useState<DownloadProgress | null>(null);
  const [updating, setUpdating] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const update = React.useCallback(async () => {
    try {
      await CodePush.sync(
        {
          installMode: CodePush.InstallMode.IMMEDIATE,
        },
        undefined,
        p => {
          setProgress(p);
        },
      );
    } catch (ex) {
      setError(JSON.stringify(ex));
    } finally {
      setUpdating(false);
    }
  }, []);

  useEffect(() => {
    update();
  }, [update]);

  return {
    updating,
    progress,
    error,
  };
};
