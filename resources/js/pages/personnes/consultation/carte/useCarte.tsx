import { useQuery } from "@tanstack/react-query";
import { personneApi } from "api";
import generatePDF, { Margin, Resolution } from "react-to-pdf";

const options = {
  // default is `save`
  method: "",
  // default is Resolution.MEDIUM = 3, which should be enough, higher values
  // increases the image quality but also the size of the PDF, so be careful
  // using values higher than 10 when having multiple pages generated, it
  // might cause the page to crash or hang.
  resolution: Resolution.HIGH,
  page: {
    // margin is in MM, default is Margin.NONE = 0
    margin: Margin.SMALL,
    // default is 'A4'
    //format: "letter",
    // default is 'portrait'
    //orientation: "landscape",
  },
  canvas: {
    // default is 'image/jpeg' for better size performance
    mimeType: "image/png",
    qualityRatio: 1,
  },
  // Customize any value passed to the jsPDF instance and html2canvas
  // function. You probably will not need this and things can break,
  // so use with caution.
  overrides: {
    // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
    pdf: {
      compress: true,
    },
    // see https://html2canvas.hertzen.com/configuration for more options
    canvas: {
      useCORS: true,
    },
  },
};

export const useCarte = (personneId: string) => {
  const { data: carte, isLoading } = useQuery({
    queryKey: ["carte_membre", personneId],
    queryFn: () => personneApi.carteMembre(personneId),
  });

  const telechargerCarte = async () => {
    // you can use a function to return the target element besides using React refs
    const getTargetElement = () => document.getElementById("content-id");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    await generatePDF(getTargetElement, options);
  };

  return {
    telechargerCarte,
    isLoading,
    carte,
  };
};
