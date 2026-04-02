

import { useEffect, useRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Dropzone components
import Dropzone from "dropzone";

// Dropzone styles
import "dropzone/dist/dropzone.css";

// Material Dashboard 3 PRO React components
import MDBox from "components/MDBox";

// Custom styles for the MDDropzone
import MDDropzoneRoot from "components/MDDropzone/MDDropzoneRoot";
import { withOwnerState } from "types/muiDashboard";
import { useMaterialUIController } from "context";

const Root = withOwnerState(MDDropzoneRoot);

function MDDropzone({ options }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const dropzoneRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    Dropzone.autoDiscover = false;

    function createDropzone() {
      const el = dropzoneRef.current;
      if (!el) return null;
      return new Dropzone(el, { ...options });
    }

    function removeDropzone() {
      if (Dropzone.instances.length > 0) Dropzone.instances.forEach((dz) => dz.destroy());
    }

    createDropzone();

    return () => removeDropzone();
  }, [options]);

  return (
    <Root
      component="form"
      action="/file-upload"
      ref={dropzoneRef}
      className="form-control dropzone"
      ownerState={{ darkMode }}
    >
      <MDBox className="fallback" bgColor="transparent">
        <MDBox component="input" name="file" type="file" multiple />
      </MDBox>
    </Root>
  );
}

// Typechecking props for the MDDropzone
MDDropzone.propTypes = {
  options: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MDDropzone;
