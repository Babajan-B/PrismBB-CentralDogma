export interface SpliceRegion {
  start: number;
  end: number; // inclusive
  type: "exon" | "intron";
}

/** Parse a pre-mRNA sequence and detect introns by GU...AG rule */
export function detectIntrons(preMrna: string): SpliceRegion[] {
  const seq = preMrna.toUpperCase().replace(/[^AUCG]/g, "");
  const regions: SpliceRegion[] = [];
  let i = 0;
  let exonStart = 0;

  while (i < seq.length - 1) {
    if (seq[i] === "G" && seq[i + 1] === "U") {
      // Potential intron start — look for downstream AG
      const agPos = seq.indexOf("AG", i + 4);
      if (agPos !== -1 && agPos - i >= 4) {
        if (i > exonStart) regions.push({ start: exonStart, end: i - 1, type: "exon" });
        regions.push({ start: i, end: agPos + 1, type: "intron" });
        exonStart = agPos + 2;
        i = agPos + 2;
        continue;
      }
    }
    i++;
  }
  if (exonStart < seq.length) regions.push({ start: exonStart, end: seq.length - 1, type: "exon" });
  return regions;
}

/** Apply splicing: remove introns, return mature mRNA */
export function splice(preMrna: string, regions: SpliceRegion[]): string {
  return regions
    .filter((r) => r.type === "exon")
    .map((r) => preMrna.toUpperCase().replace(/[^AUCG]/g, "").slice(r.start, r.end + 1))
    .join("");
}

export function sanitizeMrna(input: string): string {
  return input.toUpperCase().replace(/[^AUCG]/g, "").replace(/T/g, "U");
}

export const EXAMPLE_PRE_MRNA =
  "AUGGUAGCUAGUGCAAAGUAGUCGAGGAGGCCUAA";
// exon1: AUGG  intron1: GUAGCUAG  exon2: UGCAAAUG  intron2: GUAGUCGAG  exon3: GAGGCCUAA
