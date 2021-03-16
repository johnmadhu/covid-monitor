import { Component, OnInit, ViewChild } from '@angular/core';
import {Observable} from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpHeaderResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { MatSort,MatPaginator } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  // data : UserData[];
  isAuthenticated: boolean;
  displayedColumns: string[] = ['country', 'cases', 'deaths','critical','recovered','active'];
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  fileName= 'ExcelSheet.xlsx';
  dataSource:any;
  Highcharts = Highcharts;
  isChartLoaded = false;
  allStats: object[];
  image: any;
  update: string;
  country: string;
  counties: string[];
  cstat: any;
  total: number[];
  datas: Observable<any>;
  chartsOption:{};

  // chart
  chartOptions = {
    responsive: true,
  };
  chartData = [];
  chartLabels = [];

  pieData =[];
  pieLabels =[];
  pieOptions = {
    responsive: true,
    legend: {
        labels: {
            fontColor: 'white'
        }
    }
  };
  
  ngOnInit(){
    this.getData();
    this.getCountries();
    this.onChange();
    // this.getHistory();
    // this.dataSource.sort = this.sort;
    // this.dataSource = new MatTableDataSource(res.results);
    
  }

  exportExcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }
  onChartClick(event) {
    // console.log(event);
  }
  // chart
  constructor(private css: AuthService, private sanitizer: DomSanitizer){
    // this.dataSource = new MatTableDataSource(users);
    this.country = 'India';
    // this.css.getMaskRules().subscribe((data)=> {

      // this.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'+data);
      
      // let objectURL = 'data:image/jpeg;base64,' + data.image;
    // });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    return this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  onChange(){
    // alert('madhu')
    this.datas = this.css.getStatByCountry(this.country || 'india');
    this.datas.subscribe(stats => {
      // console.log(stats)
      this.cstat = stats;
    });
    this.getHistory();
  }

  onClickCountry(country){
    this.country = country;
    this.onChange();
  }
 
  getData(){
    this.datas = this.css.getTotal();
    this.datas.subscribe(stats => {
      this.update = stats.lastUpdate;
      this.total = stats.total;

      // console.log(this.total);
      // this.dataSource = this.total;

      // const totalCount =  this.total[1] + this.total[3] + this.total[5] + this.total[6];

      // const casses =  Math.round(this.total[1] * 100 / totalCount);
      const casses = this.total[1];
      const deaths =  Math.round(this.total[3] * 100 / casses);
      const recovered =  Math.round(this.total[5] * 100 / casses);
      const active =  Math.round(this.total[6] * 100 / casses);
      
      // console.log(deaths + "rec"+ recovered + "ac" + active)
      this.chartsOption = {
        chart: {
          plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
          type: 'pie'
        },
        title: {
            text: null
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        credits: { enabled: false },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            data: [
                { name: 'Deaths', y: deaths },
                { name: 'Recovered', y: recovered },
                { name: 'active', y: active }
            ]
        }]
      }
      HC_exporting(Highcharts);
      setTimeout(()=>{
        window.dispatchEvent(
            new Event('resize')
        )
      },300);

    });
    this.css.getAllStat().subscribe((stats:any) => {
        
      this.allStats = stats.countries_stat;
      // this.dataSource = this.allStats;
      this.dataSource = new MatTableDataSource(stats.countries_stat);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    });
  }

  getCountries(){
    this.datas = this.css.getCountries();
    this.datas.subscribe(datas => {
      this.counties = datas;
      // console.log(this.counties)
    });
  }

  getHistory(){
    this.css.getHistoryChart(this.country || 'india').subscribe(datas =>{

      this.chartOptions = {
        responsive: true
      };
      this.chartData = [
        { data: datas.casses, label: 'Casses', backgroundColor: 'dodgerblue' },
        { data: datas.deaths, label: 'Deaths', backgroundColor: 'firebrick' },
        { data: datas.recover, label: 'Recovered', backgroundColor: 'forestgreen' }
      ];
      this.chartLabels = datas.dates;

      this.isChartLoaded = true;
      // console.log(datas);
    });
  }

}
