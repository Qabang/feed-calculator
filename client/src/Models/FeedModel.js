export class FeedModel {
    constructor(data) {
        data = data != null ? data : {}
        this.data = {
            name: data.name || '',
            amount: data.amount || '',
            mj: data.mj || '',
            smrp: data.smrp || '',
            solids: data.solids || '',
            ca: data.ca || '',
            p: data.p || '',
            mg: data.mg || '',
            na: data.na || '',
            fe: data.fe || '',
            cu: data.cu || '',
            zn: data.zn || '',
            mn: data.mn || '',
            selenium: data.selenium || '',
        }
    }

    get feedModelData() {
        return this.data;
    }

    get feedModelLabels() {
        return {
            mj: { full: 'Energy (Mj)', short: 'Mj' },
            smrp: { full: 'Digestibility of crude protein (smrp)', short: 'Smrp' },
            ca: { full: 'Calcium (Ca)', short: 'Ca' },
            p: { full: 'Phosophor (P)', short: 'P' },
            mg: { full: 'Magnesium (Mg)', short: 'Mg' },
            na: { full: 'Sodium (Na)', short: 'Na' },
            fe: { full: 'Iron (Fe)', short: 'Fe' },
            cu: { full: 'Copper (Cu)', short: 'Cu' },
            zn: { full: 'Zink (Zn)', short: 'Zn' },
            mn: { full: 'Manganese (Mn)', short: 'Mn' },
            selenium: { full: 'Selenium (Se)', short: 'Se' },
        }
    }

    get feedModelUnits() {
        return {
            mj: 'Mj',
            smrp: 'g',
            ca: 'g',
            p: 'g',
            mg: 'g',
            na: 'g',
            fe: 'mg',
            cu: 'mg',
            zn: 'mg',
            mn: 'mg',
            selenium: 'mg',
        }
    }
}