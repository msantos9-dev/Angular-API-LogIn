import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-command-bar',
  templateUrl: './command-bar.component.html',
  styleUrls: ['./command-bar.component.css']
})
export class CommandBarComponent implements OnInit {

  @Output() cbEmitter = new EventEmitter(); 

  constructor(private router: Router, private route: ActivatedRoute) { }

  commandBarEmitAdd(){
    this.cbEmitter.emit('add');
  }

  commandBarEmitDeleteAll(){
    this.cbEmitter.emit('deleteAll');
  }

  ngOnInit(): void { }

}
