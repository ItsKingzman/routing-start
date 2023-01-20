import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data
    .subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    );
    //GET ID FROM ActivatedRoute from the snapshot.params & THEN THE ID ENCODED IN THE URL (CAN USE THE ID TO GET THAT SERVER)
    //IF YOU PARSE A PARAMETER FROM THE URL, IT WILL ALWAYS BE A STRING BC THE URL IS SIMPLY JUST TEXT:
    //MUST CONVERT STRING INTO A NUMBER BY ADDING A '+' = const id = +this.route.snapshot.params['id'];
    //^^ DO THE SAME IN THE PARAMS OBSERVABLE: this.server = this.serversService.getServer(+params['id']);
    // const id = +this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.server = this.serversService.getServer(+params['id']);
    //     }
    //   );
  }

  //LOAD THE /edit ROUTE: SHOULD APPEND IT TO THE END OF THE CURRENTLY LOADED ROUTE
  //Configuring the Handling of Query Parameters:
  //queryParamsHandling: 'preserve' (overrides the default behavior - drop them) keeps the old query params: 'merge' adds new query params
  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }

}
