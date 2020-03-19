import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


interface DialogConfig {
    autoFocus?: boolean;
    disableClose?: boolean;
    hasBackdrop?: boolean;
    height?: string;
    width?: string;
    data?: any;
}

@Injectable()
export class DialogService {
   constructor(private dialog: MatDialog) {}

   openDialog(component, config?: DialogConfig) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = config && config.disableClose !== undefined ? config.disableClose : false;
        dialogConfig.autoFocus = config && config.autoFocus !== undefined ? config.autoFocus : false;
        dialogConfig.hasBackdrop = config && config.hasBackdrop !== undefined ? config.hasBackdrop : true;
        if (config && config.height !== undefined) { dialogConfig.height = config.height; }
        if (config && config.width !== undefined) { dialogConfig.width = config.width; }
        if (config && config.data !== undefined) { dialogConfig.data = config.data; }
        return this.dialog.open(component, dialogConfig);
    }

}
