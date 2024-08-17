import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { pageSelection } from '@shared/models/models';
import { routes } from '@shared/routes/routes';
import { RolesService } from '../services/roles.service';
import { showAlertError, sweet } from '@shared/utils/sweet.util';


@Component({
  selector: 'app-role-user-list',
  templateUrl: './role-user-list.component.html',
  styleUrls: ['./role-user-list.component.scss']
})
export class RoleUserListComponent implements OnInit {
  public routes = routes;

  
  public roleList:any[] = [];
  public roleGeneral:any[] = [];
  private rolefilter:any[] = [];
  dataSource!: MatTableDataSource<any>;

  public showFilter = false;
  public searchDataValue = '';
  public lastIndex = 0;
  public pageSize = 20;
   public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  constructor(public RoleService : RolesService){

  }
  ngOnInit() {
    this.getTableData();
  }
  private getTableData(): void {
    // this.roleList = [];
    // this.serialNumberArray = [];

    this.RoleService.listRoles().subscribe({
    next:(resp: any) => {
      this.roleGeneral = resp.roles;
      this.rolefilter =  this.roleGeneral.slice();
      this.getTableDataGeneral();
    },
    error:(error:any)=> {
      showAlertError(error);
    }}
  );
  }

  private getTableDataGeneral(): void {
    
    this.totalData = this.rolefilter.length;
    this.roleList = [];
    this.serialNumberArray = [];

    this.rolefilter.map((res:any, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
        
          this.roleList.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<any>(this.roleList);
      this.calculateTotalPages(this.totalData, this.pageSize);
    
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.data = this.roleGeneral;
    this.dataSource.filter = value.trim();
    this.rolefilter = this.dataSource.filteredData;
    this.getTableDataGeneral();
  }

  public sortData(sort:any) {
    const data = this.roleList.slice();

    if (!sort.active || sort.direction === '') {
      this.roleList = data;
    } else {
      this.roleList = data.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableDataGeneral();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableDataGeneral();
    }
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableDataGeneral();
  }

  public updateRoles(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.searchDataValue = '';
    this.getTableData();
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    /* eslint no-var: off */
    for (var i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
  public onDelete(rol:any):void {
 
    sweet.fire({
      icon: "warning",
      title: "Eliminar",
      text: `Estas seguro de eliminar el rol : ${rol.name} ?`,
      showCancelButton: true,
      
      background: "#fff",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.deleteRol(rol.id)
      } 
    });

  }

  private deleteRol(id:number):void {
    this.RoleService.deleteRoles(id).subscribe( 
      {
       next: resp => {
        this.updateRoles()
      
       },
       error: error => {
        this.updateRoles()
        showAlertError(error);
        
         
       }
      }
     )
  }

}
